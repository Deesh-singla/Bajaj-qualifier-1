export const validateInput=(data)=> {
  const validEdges = [];
  const invalidEntries = [];

  const regex = /^[A-Z]->[A-Z]$/;

  for (let entry of data) {
    entry = entry.trim();

    if (!regex.test(entry)) {
      invalidEntries.push(entry);
      continue;
    }

    const [parent, child] = entry.split("->");

    if (parent === child) {
      invalidEntries.push(entry);
      continue;
    }

    validEdges.push(entry);
  }

  return {
    validEdges,
    invalidEntries,
  };
}