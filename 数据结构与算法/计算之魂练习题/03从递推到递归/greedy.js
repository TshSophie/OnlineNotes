// ////////////////////////////////// 问题描述///////////////////////////////////
// 假设你办了个广播节目，要让全美50个州的听众都收听得到。为此，你需要决定在哪些广播台播出。
// 在每个广播台播出都需要支付费用，因此你力图在尽可能少的广播台播出。

/*****************************解法
 * 
 * (1) 选出这样一个广播台，即它覆盖了最多的未覆盖州。即便这个广播台覆盖了一些已覆盖的州，也没有关系。
 * (2) 重复第一步，直到覆盖了所有的州。这是一种近似算法（approximation algorithm）。
 * 在获得精确解需要的时间太长时，可使用近似算法。判断近似算法优劣的标准如下：❑ 速度有多快；❑ 得到的近似解与最优解的接近程度。
 * 贪婪算法是不错的选择，它们不仅简单，而且通常运行速度很快。在这个例子中，贪婪算法的运行时间为O(n^2)，其中n为广播台数量。
 * 
 * 采用该算法得出的结果，选择的广播台可能是2、3、4和5，而不是预期的1、2、3和5。但是它也是符合要求的
*/


// You pass an array in, and it gets converted to a set.
let statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

const stations = {};
// 电视台 =》 覆盖的州
stations.kone = new Set(["id", "nv", "ut"]);
stations.ktwo = new Set(["wa", "id", "mt"]);
stations.kthree = new Set(["or", "nv", "ca"]);
stations.kfour = new Set(["nv", "ut"]);
stations.kfive = new Set(["ca", "az"]);

const finalStations = new Set();

while (statesNeeded.size) {
  // states_covered是一个集合，包含该广播台覆盖的所有未覆盖的州。for循环迭代每个广播台，并确定它是否是最佳的广播台。
  let bestStation = null;
  let statesCovered = new Set();
  // 遍历电视台map
  Object.keys(stations).forEach(station => {
    // 取出当前电视台覆盖的所有州
    const states = stations[station];    
    const covered = new Set([...statesNeeded].filter(x => states.has(x)));
    // 判断当前覆盖的州的数量是否大于之前记录的
    if (covered.size > statesCovered.size) {
      bestStation = station;
      statesCovered = covered;
    }
  });
  // 从州集合里剔除已经采纳的电台所覆盖的州
  statesNeeded = new Set([...statesNeeded].filter(x => !statesCovered.has(x)));
  // 记录该电台   
  finalStations.add(bestStation);
}

console.log(finalStations); // Set { 'kone', 'ktwo', 'kthree', 'kfive' }