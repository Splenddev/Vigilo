// utils/groupHealth.js
export const getGroupHealth = (group) => {
  const issues = [];

  if (!group?.studentsRosterId?.students?.length) {
    issues.push({
      type: 'warning',
      message:
        'No student roster has been uploaded yet — students will not be auto-enrolled until you provide one.',
    });
  }

  if (!group?.sessions?.length) {
    issues.push({
      type: 'info',
      message:
        'This group has no sessions scheduled yet — create sessions to enable attendance tracking.',
    });
  }

  if (!group?.description || group.description.trim().length < 15) {
    issues.push({
      type: 'info',
      message:
        'The group description is too short. Adding more details will help students understand the course better.',
    });
  }

  if (group?.privacy === 'private' && !group?.inviteEnabled) {
    issues.push({
      type: 'warning',
      message:
        'Group is private but no invite option is enabled — students may not be able to join.',
    });
  }

  // Add more rules as needed (assignments, media, etc.)
  return issues;
};
