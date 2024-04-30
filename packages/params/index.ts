export const params = () => {
  return (req: any) => {
    const url = req.getUrl();

    if (!req.pattern.includes(":")) {
      return;
    }

    req.params = req.pattern
      .split("/")
      .filter((x: string) => x !== "")
      .reduce((acc: any, curr: string, index: number) => {
        if (curr.includes(":")) {
          acc[curr.replace(":", "")] = url.split("/")[index + 1];
        }

        return acc;
      }, {});
  };
};
