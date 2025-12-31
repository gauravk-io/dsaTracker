// Auto-generated index file for DSA Tracker patterns
// This file imports all pattern JSON files and merges them into a single array

import pattern1 from "./patterns/01-knapsack-dynamic-programming.json";
import pattern2 from "./patterns/ordered-set.json";
import pattern3 from "./patterns/backtracking.json";
import pattern4 from "./patterns/bitwise-xor.json";
import pattern5 from "./patterns/cyclic-sort.json";
import pattern6 from "./patterns/fast-slow-pointers.json";
import pattern7 from "./patterns/graphs.json";
import pattern8 from "./patterns/greedy-algorithms.json";
import pattern9 from "./patterns/hash-maps.json";
import pattern10 from "./patterns/in-place-reversal-of-a-linkedlist.json";
import pattern11 from "./patterns/island-matrix-traversal.json";
import pattern12 from "./patterns/k-way-merge.json";
import pattern13 from "./patterns/merge-intervals.json";
import pattern14 from "./patterns/modified-binary-search.json";
import pattern15 from "./patterns/kadane-pattern.json";
import pattern16 from "./patterns/prefix-sum.json";
import pattern17 from "./patterns/sliding-window.json";
import pattern18 from "./patterns/stack.json";
import pattern19 from "./patterns/subsets.json";
import pattern20 from "./patterns/top-k-elements.json";
import pattern21 from "./patterns/topological-sort-graph.json";
import pattern22 from "./patterns/tree-breadth-first-search.json";
import pattern23 from "./patterns/tree-depth-first-search.json";
import pattern24 from "./patterns/trie.json";
import pattern25 from "./patterns/two-heaps.json";
import pattern26 from "./patterns/two-pointers.json";
import pattern27 from "./patterns/union-find.json";

// Merge all problems into a single array with auto-generated IDs
// ID format: pattern-name-index (e.g., "two-pointers-0", "two-pointers-1")
// This ensures unique IDs per pattern and makes scaling easy
const allProblems = [];
let globalIndex = 0;

[
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
  pattern10,
  pattern11,
  pattern12,
  pattern13,
  pattern14,
  pattern15,
  pattern16,
  pattern17,
  pattern18,
  pattern19,
  pattern20,
  pattern21,
  pattern22,
  pattern23,
  pattern24,
  pattern25,
  pattern26,
  pattern27,
].forEach((patternProblems) => {
  patternProblems.forEach((problem, index) => {
    // Create a unique ID based on pattern name and index within that pattern
    const patternSlug = problem.pattern
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    allProblems.push({
      ...problem,
      id: `${patternSlug}-${index}`,
      _globalIndex: globalIndex++, // For backward compatibility with localStorage
    });
  });
});

export default allProblems;
