const pad2 = (value) => String(Number(value) || 0).padStart(2, '0');

const hasNumericValue = (value) =>
  value !== null && value !== undefined && String(value).trim() !== '' && Number.isFinite(Number(value));

const toNumberList = (items) =>
  [...new Set((items || []).map((item) => Number(item)).filter((item) => Number.isFinite(item)))].sort(
    (a, b) => a - b
  );

const parseDayNumbers = (dayRefs) => {
  const dayNumbers = new Set();
  (dayRefs || []).forEach((ref) => {
    const match = /^week-(\d+)-day-(\d+)$/i.exec(String(ref || '').trim());
    if (!match) return;
    const day = Number(match[2]);
    if (Number.isFinite(day)) dayNumbers.add(day);
  });
  return [...dayNumbers].sort((a, b) => a - b);
};

export const sanitizeAnkiTag = (tag) =>
  String(tag || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9+_.:-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_:.]+|[-_:.]+$/g, '');

const normalizeDeckBase = (deckBase) => {
  const value = String(deckBase || '').trim();
  return value || 'CyberStudy';
};

const phaseFromWeek = (weekNumber) => {
  if (!Number.isFinite(weekNumber) || weekNumber <= 0) return null;
  return Math.max(1, Math.ceil(weekNumber / 8));
};

const toHtmlField = (value) =>
  String(value ?? '')
    .replace(/\r\n|\r|\n/g, '<br>')
    .replace(/\t/g, ' ')
    .trim();

const quoteTsvField = (value) => `"${toHtmlField(value).replace(/"/g, '""')}"`;

const resolveCardWeek = (card, forcedWeek) => {
  if (hasNumericValue(forcedWeek)) return Number(forcedWeek);
  const weeks = toNumberList(card.week_refs);
  return weeks.length ? weeks[0] : null;
};

const resolveCardPhase = ({ card, forcedPhaseNumber, weekNumber, weekToPhaseNumber, phaseRefToNumber }) => {
  if (hasNumericValue(forcedPhaseNumber)) return Number(forcedPhaseNumber);

  if (hasNumericValue(weekNumber)) {
    const mapped = Number(weekToPhaseNumber?.[weekNumber]);
    if (Number.isFinite(mapped) && mapped > 0) return mapped;
    return phaseFromWeek(Number(weekNumber));
  }

  const phaseRef = (card.phase_refs || [])[0];
  const mappedFromRef = Number(phaseRefToNumber?.[phaseRef]);
  if (Number.isFinite(mappedFromRef) && mappedFromRef > 0) return mappedFromRef;

  return 1;
};

const resolveDeckName = ({ deckBase, granularity, weekNumber, phaseNumber, forceDeckName }) => {
  if (forceDeckName) return String(forceDeckName);

  if (granularity === 'one') return deckBase;

  if (granularity === 'phase' || !hasNumericValue(weekNumber)) {
    return `${deckBase}::Phase ${phaseNumber}`;
  }

  return `${deckBase}::Phase ${phaseNumber}::Week ${pad2(weekNumber)}`;
};

const resolveTags = ({ card, includeDayTags, weekNumber, phaseNumber }) => {
  const tagSet = new Set();

  (card.tags || []).forEach((tag) => {
    const sanitized = sanitizeAnkiTag(tag);
    if (sanitized) tagSet.add(sanitized);
  });

  if (hasNumericValue(phaseNumber)) {
    tagSet.add(`phase:${Number(phaseNumber)}`);
  }

  if (hasNumericValue(weekNumber)) {
    tagSet.add(`week:${pad2(weekNumber)}`);
  }

  if (includeDayTags) {
    parseDayNumbers(card.day_refs).forEach((dayNumber) => {
      tagSet.add(`day:${dayNumber}`);
    });
  }

  const cardType = sanitizeAnkiTag(card.type);
  if (cardType) tagSet.add(`type:${cardType}`);

  const difficulty = sanitizeAnkiTag(card.difficulty);
  if (difficulty) tagSet.add(`difficulty:${difficulty}`);

  const exam = sanitizeAnkiTag(card.exam_relevance);
  if (exam) tagSet.add(`exam:${exam}`);

  return [...tagSet].join(' ');
};

export const buildAnkiTsv = ({
  cards = [],
  deckBase = 'CyberStudy',
  granularity = 'week',
  includeDayTags = true,
  weekToPhaseNumber = {},
  phaseRefToNumber = {},
  forceDeckName = '',
  forceWeek = null,
  forcePhaseNumber = null
} = {}) => {
  const normalizedDeckBase = normalizeDeckBase(deckBase);
  const normalizedGranularity = ['one', 'phase', 'week'].includes(granularity) ? granularity : 'week';

  const headerLines = [
    '#separator:Tab',
    '#html:true',
    '#columns:Front\tBack\tTags\tDeck',
    '#tags column:3',
    '#deck column:4'
  ];

  const recordLines = (cards || []).map((card) => {
    const weekNumber = resolveCardWeek(card, forceWeek);
    const phaseNumber = resolveCardPhase({
      card,
      forcedPhaseNumber: forcePhaseNumber,
      weekNumber,
      weekToPhaseNumber,
      phaseRefToNumber
    });

    const deckName = resolveDeckName({
      deckBase: normalizedDeckBase,
      granularity: normalizedGranularity,
      weekNumber,
      phaseNumber,
      forceDeckName
    });

    const tags = resolveTags({
      card,
      includeDayTags,
      weekNumber,
      phaseNumber
    });

    return [
      quoteTsvField(card.front || ''),
      quoteTsvField(card.back || ''),
      quoteTsvField(tags),
      quoteTsvField(deckName)
    ].join('\t');
  });

  return `${[...headerLines, ...recordLines].join('\n')}\n`;
};

export const downloadTextFile = ({
  filename = 'anki-export.tsv',
  content = '',
  mime = 'text/tab-separated-values;charset=utf-8'
} = {}) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
