// TODO delete this when we change to real api calls

export default function sleep(ms: number = 500): Promise<void> {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
}
