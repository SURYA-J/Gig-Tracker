// Get visible gigs
export default (gigs, {text, selectedDate }) => {
  return gigs.filter((gig) => {
    const textMatch = gig.companyName
      .toLowerCase()
      .includes(text.toLowerCase());
      console.log(gig)
    const uidMatch = gig.uid
      .toLowerCase()
      .includes(text.toLowerCase())
    console.log(uidMatch)
    let selectedDateMatch = true;

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
        selectedDateMatch = true;
        break;
      } else {
        selectedDateMatch = false;
        continue;
      }
    }
    return  selectedDateMatch && textMatch || uidMatch;
  }).sort((a, b) => {
    return a.startDate > b.startDate ? 1 : -1;;
})
}
