import moment from "moment";
export function isValidEmail(email) {
  // This is a regular expression that checks email format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex pattern
  return regex.test(email);
}

//
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  let initials = ""; 

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i]) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};

//thousand separator
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionPart ? `${formattedInteger}.${fractionPart}` : formattedInteger;
};

//prepareExpenseBarChartData
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    label: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

//prepareIncomeBarChartData
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date (a.date) - new Date (b.date));
  const chartData = sortedData.map((item) => ({
    label: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
} 

//prepareExpenseLineChartData
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date (a.date) - new Date (b.date));
  const chartData = sortedData.map((item) => ({
    label: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
} 