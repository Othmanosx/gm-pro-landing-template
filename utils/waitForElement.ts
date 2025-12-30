const timers = new Map();

const waitForSelector = (
  selector: string,
  options: { timeout: number; id?: string; skipReport?: () => boolean }
) => {
  return new Promise((resolve, reject) => {
    // Create a key from the selector and the optional id
    const key = `${selector}-${options.id || ""}`;

    // Clear the existing timer for the key (if any)
    const existingTimer = timers.get(key);
    if (existingTimer) {
      clearInterval(existingTimer);
    }

    const startTime = Date.now();
    const timer = setInterval(() => {
      try {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(timer);
          timers.delete(key);
          resolve(element);
        } else if (Date.now() - startTime >= options.timeout) {
          clearInterval(timer);
          timers.delete(key);

          if (options.skipReport?.()) {
            resolve(null);
            return;
          }

          reject(new Error("Timeout " + key));
        }
      } catch (error) {
        clearInterval(timer);
        timers.delete(key);
        reject(new Error("Invalid selector: " + selector));
      }
    }, 100);

    // Store the new timer
    timers.set(key, timer);
  });
};

// Function to cancel a specific waitForSelector by id
const cancelWaitForSelector = (selector: string, id?: string) => {
  console.log("Cancelling waitForSelector for", { selector, id });

  const key = `${selector}-${id || ""}`;
  const timer = timers.get(key);
  if (timer) {
    clearInterval(timer);
    timers.delete(key);
    return true;
  }
  return false;
};

export default waitForSelector;
export { cancelWaitForSelector };
