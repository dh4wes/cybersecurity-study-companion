const isSet = (set, value) => set.has(value);

export const buildWeekDayIndex = (weeks) =>
  weeks.map((week) => ({
    ...week,
    actionableDays: week.days.filter((day) => day.session_type !== 'Rest')
  }));

export const computeProgressMetrics = (weeks, progress) => {
  const completedSet = new Set(progress.completedDays || []);
  const blockedSet = new Set(progress.blockedDays || []);
  const completedWeekSet = new Set(progress.completedWeeks || []);

  const indexedWeeks = buildWeekDayIndex(weeks);

  const actionableDays = indexedWeeks.flatMap((week) => week.actionableDays);
  const studyDays = actionableDays.filter((day) => day.session_type === 'Study');
  const reviewDays = actionableDays.filter((day) => day.session_type === 'Review');

  const completedActionable = actionableDays.filter((day) => isSet(completedSet, day.id)).length;
  const completedStudyDays = studyDays.filter((day) => isSet(completedSet, day.id)).length;
  const completedReviewDays = reviewDays.filter((day) => isSet(completedSet, day.id)).length;

  const totalPercent = actionableDays.length
    ? Math.round((completedActionable / actionableDays.length) * 100)
    : 0;

  const blockedItems = indexedWeeks
    .flatMap((week) => week.days.map((day) => ({ week, day })))
    .filter(({ day }) => isSet(blockedSet, day.id))
    .map(({ week, day }) => ({
      dayId: day.id,
      label: `Week ${String(week.week).padStart(2, '0')} ${day.label}`,
      weekSlug: week.href || week.slug,
      objective: day.session_objective
    }));

  const progressByPhase = indexedWeeks.reduce((acc, week) => {
    const phase = week.phase;
    if (!acc[phase]) {
      acc[phase] = { phase, completed: 0, total: 0 };
    }
    acc[phase].total += week.actionableDays.length;
    acc[phase].completed += week.actionableDays.filter((day) => isSet(completedSet, day.id)).length;
    return acc;
  }, {});

  const progressByWeek = indexedWeeks.map((week) => {
    const total = week.actionableDays.length;
    const completed = week.actionableDays.filter((day) => isSet(completedSet, day.id)).length;
    const isCompleted = completedWeekSet.has(week.id) || (total > 0 && completed === total);
    return {
      week: week.week,
      id: week.id,
      slug: week.href || week.slug,
      total,
      completed,
      isCompleted,
      percent: total ? Math.round((completed / total) * 100) : 0,
      deliverable: week.deliverable,
      checkpoint: week.checkpoint,
      phase: week.phase
    };
  });

  const nextTask = indexedWeeks
    .flatMap((week) => week.actionableDays.map((day) => ({ week, day })))
    .find(({ day }) => !isSet(completedSet, day.id));

  const nextDeliverableWeek = progressByWeek.find((week) => !week.isCompleted);

  return {
    totalPercent,
    completedStudyDays,
    completedReviewDays,
    completedWeeks: progressByWeek.filter((week) => week.isCompleted).length,
    blockedItems,
    nextTask,
    nextDeliverableWeek,
    progressByPhase: Object.values(progressByPhase),
    progressByWeek
  };
};

export const formatNextTask = (nextTask) => {
  if (!nextTask) return 'All actionable tasks complete.';
  return `Week ${String(nextTask.week.week).padStart(2, '0')} ${nextTask.day.label} - ${nextTask.day.session_type}`;
};
