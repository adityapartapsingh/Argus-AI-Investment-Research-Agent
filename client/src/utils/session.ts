export function getBrowserSessionId(): string {
  let sessionId = localStorage.getItem("browserSessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("browserSessionId", sessionId);
  }
  return sessionId;
}
