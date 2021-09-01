export default (gigs, selectedDate) => {
  return gigs.filter((gig) => {
    let selectedDateMatch = "";
    let finalDate = [];
    // console.log(selectedDateMatch)// const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    if (selectedDate) {
      for (
        let i = Number(gig.startDate);
        i <= Number(gig.endDate);
        i = i + 86400000
      ) {
        finalDate.push(i);
      }
    }
    for (let i = 0; i < finalDate.length; i++) {
      const f = finalDate[i];
      if (Number(selectedDate) == f) {
        selectedDateMatch = gig.companyName;
        break;
      } else {
        continue;
      }
    }
    return selectedDateMatch;
  });
};
