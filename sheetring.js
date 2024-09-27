async function fetchData() {
  // The config bit:

  // Your webring name
  const ringname = "Webring name";

  // Your index url
  const indexurl = "https://webring.example.com/index.html";

  // https://docs.google.com/spreadsheets/d/THIS IS THE ID/edit
  const sheetId = "GSHEET ID";

  // element id of your webring element, no spaces.
  // Once set, cannot be changed without changing the element on every members page
  const elid = "RINGID";

  // end config bit

  const url =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    sheetId +
    "/values/A2:Z1000?key=AIzaSyAcAmP6Q3xN-1fGENdw58NTPmRBMlrXeEY";
  const options = { method: "GET" };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const ringbox = document.getElementById(elid);
    const find = window.location.origin;
    const index = data.values.findIndex((sub) => sub.includes(find));
    // Please don't delete the credit part, feel free to move it or change the rest, but leave credit in
    if (index == 0 && index == data.values.length - 1) {
      ringbox.innerHTML +=
        "<h3>" +
        ringname +
        "</h3><h4><a href='" +
        data.values[index][3] +
        "'>Previous Page</a>   <a href='" +
        data.values[index][3] +
        "'>Next Page</a><br><small>Powered by <a href='https://github.com/sebastian-92/sheetringjs'>sheetring.js</a></small>";
    } else if (index == 0) {
      ringbox.innerHTML +=
        "<h3>" +
        ringname +
        "</h3><h4><a href='" +
        data.values[data.values.length - 1][3] +
        "'>Previous Page</a>   <a href='" +
        data.values[index + 1][3] +
        "'>Next Page</a><br><small>Powered by <a href='https://github.com/sebastian-92/sheetringjs'>sheetring.js</a></small>";
    } else if (index == data.values.length - 1) {
      ringbox.innerHTML +=
        "<h3>" +
        ringname +
        "</h3><h4><a href='" +
        data.values[index - 1][3] +
        "'>Previous Page</a>   <a href='" +
        data.values[0][3] +
        "'>Next Page</a><br><small>Powered by <a href='https://github.com/sebastian-92/sheetringjs'>sheetring.js</a></small>";
    } else if (index == -1) {
      ringbox.innerHTML +=
        "<h3>This website is not registered in " +
        ringname +
        "</h3><h4><a href='" +
        data.values[0][3] +
        "'>First Page</a>   <a href='" +
        data.values[1][3] +
        "'>Second Page</a><br><small>Powered by <a href='https://github.com/sebastian-92/sheetringjs'>sheetring.js</a></small>";
    } else {
      ringbox.innerHTML +=
        "<h3>" +
        ringname +
        "</h3><h4><a href='" +
        data.values[index - 1][3] +
        "'>Previous Page</a>   <a href='" +
        data.values[index + 1][3] +
        "'>Next Page</a><br><small>Powered by <a href='https://github.com/sebastian-92/sheetringjs'>sheetring.js</a></small>";
    }
  } catch (error) {
    ringbox.innerHTML = `Error: ${error.message}`;
  }
}

fetchData();
