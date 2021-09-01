export default (gigs) => {
    let busyDates = [];
    gigs.filter((gig) => {
        for (
          let i = Number(gig.startDate);
          i <= Number(gig.endDate);
          i = i + 86400000
        ) {
          busyDates.push(i);
        }
    });
    return busyDates
  };
  