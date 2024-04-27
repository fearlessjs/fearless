export function readJson(res) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);

    res.onData((ab, isLast) => {
      const chunk = Buffer.from(ab);
      buffer = Buffer.concat([buffer, chunk]);
      if (isLast) {
        try {
          if (buffer.length === 0) {
            resolve({});
            return;
          }

          const json = JSON.parse(buffer.toString() ?? "{}");
          resolve(json);
        } catch (e) {
          reject(e);
        }
      }
    });

    res.onAborted((err) => {
      reject(err);
    });
  });
}
