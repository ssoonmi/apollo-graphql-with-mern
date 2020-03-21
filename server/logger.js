module.exports = (req, res, params) => {
  const { query, variables, operationName } = params;
  res.on("finish", function() {
    const operation = operationName || 'no operation specified';
    console.log(
      "\x1b[36m%s%s\x1b[0m",
      `${new Date().toLocaleString("en-US")} - `,
      operation
    );
    console.group();
    if (query) console.log(query);
    if (variables) console.log("variables: ", variables);
    console.groupEnd();
  });
}