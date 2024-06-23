// convert blockchain date 10-10-2021 to 10-Oct-2021
export function formatDate(inputDateString) {
  // Parse the input date string
  const parsedDate = new Date(inputDateString);
  if (parsedDate === "Invalid Date") {
    return inputDateString;
  }

  // Options for formatting the day of the week
  const options = { month: "short" };

  // Format the date
  const formattedDate = `${parsedDate.getDate()}-${parsedDate.toLocaleDateString(
    "en-US",
    options
  )}-${parsedDate.getFullYear()}`;

  return formattedDate;
}

//convert date to 10-10-2021
export function formatToDatetring(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

//timestamp to date and time
export function formatToDateTime(timestamp) {
  const formatedDate = timestamp * 1000;
  const date = new Date(formatedDate);
  return date.toLocaleString();
}

// Function to check if a date is expired
export function isExpired(inputDate) {
  const parsedDate = new Date(inputDate);
  const currentDate = new Date();
  if (parsedDate < currentDate) {
    return true;
  } else {
    return false;
  }
}

// format to yyyy-mm-dd
export function formatToYMD(date) {
  const inputDate = "10-03-2024"; // Input date
  const parts = inputDate.split("-"); // Split the date into day, month, and year parts
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Rearrange the parts into "yyyy-MM-dd" format

  return formattedDate;
}
