export default async function sleep(time: number) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + time) {}
}

//