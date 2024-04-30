export const queryString = () => {
  return (req) => {
    const query = req.getQuery() || "";

    req.query = query.split("&").reduce((acc, cur: string) => {
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {}) as Record<string, string>;
  };
};
