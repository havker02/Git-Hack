import jsonfile from "jsonfile";
import moment from "moment";
import random from "random";
import simpleGit from "simple-git";

const path = "./data.json";
const date = moment().format();

const makeCommit = (n) => {
  if (n === 0) {
    return simpleGit().push();
  }
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const commitDate = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  // Here we commit with the calculated date
  simpleGit().add([path]).commit(`Commit #${n}`, { "--date": commitDate }, () => makeCommit(n - 1));
};

const data = {
  date: date
};

jsonfile.writeFile(path, data, () => {
  simpleGit().add([path]).commit(date, { "--date": date }, () => makeCommit(100)); // Start with n = 100
});
