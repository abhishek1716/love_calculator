function flamesCalculator(name1, name2) {
  // Remove spaces and convert to lowercase for a case-insensitive comparison
  const name1Processed = name1.replace(/\s+/g, "").toLowerCase();
  const name2Processed = name2.replace(/\s+/g, "").toLowerCase();

  let count = 0;
  let name1Chars = name1Processed.split("");
  let name2Chars = name2Processed.split("");

  // Count and remove common characters
  for (let i = 0; i < name1Chars.length; i++) {
    if (name2Chars.includes(name1Chars[i])) {
      // Remove the character from both names
      name2Chars.splice(name2Chars.indexOf(name1Chars[i]), 1);
      name1Chars[i] = "";
    }
  }

  // Count remaining characters in both names
  count = name1Chars.join("").length + name2Chars.length;

  // FLAMES acronym
  const flames = "FLAMES";
  let flameResult = flames;

  // Determine the relationship by cycling through FLAMES
  if (count > 0) {
    while (flameResult.length > 1) {
      let splitIndex = count % flameResult.length;
      splitIndex = splitIndex === 0 ? flameResult.length : splitIndex;
      flameResult =
        flameResult.substring(splitIndex) +
        flameResult.substring(0, splitIndex - 1);
    }
  }

  // Return the result based on the remaining letter in FLAMES
  switch (flameResult) {
    case "F":
      return "Friends";
    case "L":
      return "Love";
    case "A":
      return "Affection";
    case "M":
      return "Marriage";
    case "E":
      return "Enemies";
    case "S":
      return "Siblings";
    default:
      return "Friends";
  }
}

function calculateLoveCompatibility(name1, name2) {
  // Combine and preprocess names
  const combinedNames = (name1 + name2).toLowerCase().replace(/\s+/g, "");

  // Define the "true love" string to count letters from
  const trueLove = "truelove";

  // Initialize an array to keep count of occurrences of each letter in "true love"
  let counts = new Array(trueLove.length).fill(0);

  // Count occurrences of each letter in "true love" within the combined names
  for (let i = 0; i < trueLove.length; i++) {
    counts[i] = combinedNames.split(trueLove[i]).length - 1;
  }

  // Combine the counts into a single string
  let combinedCounts = counts.join("");
  // Split the string into an array of numbers
  const digits = combinedCounts.split("").map(Number);

  // Calculate the sum of the first 4 and last 4 digits
  const sumFirst4 = digits.slice(0, 4).reduce((acc, curr) => acc + curr, 0);
  const sumLast4 = digits.slice(-4).reduce((acc, curr) => acc + curr, 0);

  // Concatenate the sums
  let result = parseInt(`${sumFirst4}${sumLast4}`, 10);

  // Cap the result at 100 if it's greater than 100
  result = result > 100 ? 100 : result;

  // The result is the compatibility percentage
  return result;
}

function loveCalculator(name1, name2) {
  // Combine the names with "loves" in the middle, remove spaces, and convert to lowercase
  const combined = `${name1} loves ${name2}`.replace(/\s+/g, "").toLowerCase();

  // Create a map to count occurrences of each character
  const charMap = {};
  for (const char of combined) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  // Convert the character counts to an array of numbers
  let numbers = Object.values(charMap).join("").split("").map(Number);

  // Function to reduce the numbers according to the specific rules
  function reduceNumbers(nums) {
    // If only two digits are left, return them as a percentage
    if (nums.length <= 2) {
      return nums.join("");
    }

    let newNums = [];
    // Add first and last, push each digit of the sum separately if needed
    while (nums.length > 1) {
      let sum = nums.shift() + nums.pop();
      newNums = newNums.concat(sum.toString().split("").map(Number));
    }
    // If there's an odd number of elements, the middle one goes to the next round as is
    if (nums.length) {
      newNums.push(nums[0]);
    }
    return reduceNumbers(newNums);
  }

  // Start the reduction process
  let compatibilityPercentage = reduceNumbers(numbers);

  // Ensure the compatibility percentage does not exceed 100
  compatibilityPercentage =
    parseInt(compatibilityPercentage, 10) > 100 ? 100 : compatibilityPercentage;

  return Number(compatibilityPercentage);
}

export const CalculateLoveUtil = (yourName, partnerName) => {
  const flamesCal = flamesCalculator(yourName, partnerName);
  const loveCompatibility = calculateLoveCompatibility(yourName, partnerName);
  const loveCal = loveCalculator(yourName, partnerName);

  return {
    category: flamesCal,
    compatibility: loveCompatibility,
    love: loveCal,
  };
};

export const getLoveCalculatorResult = (result) => {
  const { category, compatibility, love } = result;

  const showCat = category.toUpperCase();
  const messages = {
    Siblings: {
      compatibility: {
        "<30": {
          "<30":
            "With low compatibility ([Compatibility%]) and minimal affection ([Loves%]), your relationship might mirror that of siblings who have significant differences, finding it challenging to connect on deeper levels.",
          "30-65":
            "Despite the challenges posed by low compatibility ([Compatibility%]), the moderate level of affection ([Loves%]) suggests an underlying bond that could resemble the complex but ultimately caring relationship typical between siblings.",
          "65-90":
            "An interesting dynamic: low compatibility ([Compatibility%]) combined with high affection ([Loves%]) reflects a sibling-like relationship filled with ups and downs yet underpinned by a strong emotional connection.",
          ">90":
            "Exceptionally high affection ([Loves%]), despite low compatibility ([Compatibility%]), suggests a relationship akin to that of siblings who may clash but also share a profound, unconditional bond.",
        },
        "30-65": {
          "<30":
            "With moderate compatibility ([Compatibility%]), your relationship has the potential to develop a sibling-like understanding, though the low intensity of feelings ([Loves%]) might mean it lacks warmth at times.",
          "30-65":
            "A balance of moderate compatibility ([Compatibility%]) and affection ([Loves%]) paints a picture of a relationship that could resemble the supportive, yet sometimes competitive, nature of sibling bonds.",
          "65-90":
            "The blend of moderate compatibility ([Compatibility%]) with high affection ([Loves%]) suggests a deeply bonded relationship, reminiscent of siblings who are not only close but also deeply care for each other.",
          ">90":
            "Moderate compatibility ([Compatibility%]) combined with exceptionally high affection ([Loves%]) indicates a sibling-like relationship that’s rich in mutual admiration and deep, familial love, transcending typical boundaries.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) lays a solid foundation for a sibling-like relationship, though the lower intensity of feelings ([Loves%]) may indicate respect and loyalty more than emotional closeness.",
          "30-65":
            "With high compatibility ([Compatibility%]) and solid affection ([Loves%]), your relationship mirrors that of siblings who share a strong bond, marked by mutual support and understanding.",
          "65-90":
            "This combination of high compatibility ([Compatibility%]) and strong affection ([Loves%]) embodies the essence of a close-knit sibling relationship, characterized by deep emotional support and a strong sense of belonging.",
          ">90":
            "Very high compatibility ([Compatibility%]) and extraordinarily high affection ([Loves%]) reflect a sibling relationship of exceptional depth, where profound mutual love and understanding are a given.",
        },
        ">90": {
          "<30":
            "Exceptional compatibility ([Compatibility%]) suggests a perfect foundation for a sibling-like bond, though the low affection ([Loves%]) might mean the relationship is more about mutual respect than deep emotional connection.",
          "30-65":
            "With unparalleled compatibility ([Compatibility%]) and moderate affection ([Loves%]), your relationship is akin to that of siblings who not only understand each other deeply but also share a solid, if not overly expressive, bond of affection.",
          "65-90":
            "The rare combination of very high compatibility ([Compatibility%]) and strong affection ([Loves%]) signifies a sibling relationship that’s deeply nurturing, marked by an enduring bond and heartfelt support.",
          ">90":
            "An extraordinary level of compatibility ([Compatibility%]) paired with exceptionally high affection ([Loves%]) mirrors the deepest and most meaningful sibling bonds, where support, understanding, and love are limitless.",
        },
      },
    },
    Enemies: {
      compatibility: {
        "<30": {
          "<30":
            "With low compatibility ([Compatibility%]) and minimal affection ([Loves%]), it's clear there are significant challenges that might make understanding difficult, leading to a contentious relationship.",
          "30-65":
            "Despite low compatibility ([Compatibility%]), the moderate level of affection ([Loves%]) suggests an underlying respect or admiration that could, in time, transform contention into a complex form of camaraderie.",
          "65-90":
            "An intriguing paradox: low compatibility ([Compatibility%]) contrasts sharply with high affection ([Loves%]), indicating a relationship where intense emotions could fuel both conflict and an unexpected depth of feeling.",
          ">90":
            "Exceptionally high affection ([Loves%]) amidst low compatibility ([Compatibility%]) creates a powerful dynamic, suggesting that beneath the surface conflict lies a profound, if complicated, connection.",
        },
        "30-65": {
          "<30":
            "Moderate compatibility ([Compatibility%]) might reduce the frequency of conflicts, but low affection ([Loves%]) suggests that when disputes arise, they may lack a foundation for quick resolution.",
          "30-65":
            "A relationship with moderate compatibility ([Compatibility%]) and affection ([Loves%]) presents a unique scenario where disagreements may occur, yet there's enough mutual respect to potentially bridge differences.",
          "65-90":
            "The combination of moderate compatibility ([Compatibility%]) and high affection ([Loves%]) in a contentious relationship hints at a dynamic where arguments could be intense yet interspersed with moments of understanding and respect.",
          ">90":
            "This unusual pairing of moderate compatibility ([Compatibility%]) with extraordinarily high affection ([Loves%]) in an adversarial relationship suggests a deep bond that could turn rivalry into a form of intense, if unconventional, friendship.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) suggests that disagreements may be rare or based on principles, but the low affection ([Loves%]) indicates a coldness or detachment that makes resolution challenging.",
          "30-65":
            "In this scenario, high compatibility ([Compatibility%]) combined with moderate affection ([Loves%]) could mean that while conflicts are infrequent and may be resolved, they lack the warmth that could turn adversaries into allies.",
          "65-90":
            "A unique situation where high compatibility ([Compatibility%]) and strong affection ([Loves%]) coexist with rivalry, suggesting that conflicts, while deeply felt, are matched by an equally deep respect or hidden fondness.",
          ">90":
            "An extraordinary dynamic where very high compatibility ([Compatibility%]) and extremely high affection ([Loves%]) underpin a relationship of adversaries, indicating a complex interplay of respect, challenge, and perhaps an underlying admiration.",
        },
        ">90": {
          "<30":
            "Exceptional compatibility ([Compatibility%]) indicates a perfect match in many ways, yet the low affection ([Loves%]) reveals a significant emotional divide, suggesting that any conflict might stem from profound differences in values or beliefs.",
          "30-65":
            "With unparalleled compatibility ([Compatibility%]) and moderate affection ([Loves%]), conflicts may be rare and rooted in deep, philosophical differences rather than personal animosity, offering a basis for respect despite adversity.",
          "65-90":
            "This rare combination of very high compatibility ([Compatibility%]) and strong affection ([Loves%]) in an adversarial relationship suggests an intense, possibly transformative rivalry that carries a deep, if conflicted, mutual respect.",
          ">90":
            "An exceptional case of enemies, where exceptional compatibility ([Compatibility%]) and extraordinarily high affection ([Loves%]) suggest a relationship that transcends simple rivalry, embodying a profound connection that might oscillate between conflict and deep mutual admiration.",
        },
      },
    },
    Marriage: {
      compatibility: {
        "<30": {
          "<30":
            "The prospect of marriage faces challenges with low compatibility ([Compatibility%]) and minimal affection ([Loves%]), suggesting significant differences that might be hard to bridge.",
          "30-65":
            "Despite low compatibility ([Compatibility%]), a moderate level of affection ([Loves%]) provides a glimmer of hope, suggesting that with effort, understanding, and patience, a stronger bond could be formed.",
          "65-90":
            "An interesting contrast: low compatibility ([Compatibility%]) paired with high affection ([Loves%]) suggests a relationship where strong emotions could potentially overcome practical challenges.",
          ">90":
            "Exceptionally high affection ([Loves%]), against the odds of low compatibility ([Compatibility%]), indicates a passionate relationship where love might find a way to transcend differences.",
        },
        "30-65": {
          "<30":
            "With moderate compatibility ([Compatibility%]), the foundation for marriage is present, though the low intensity of affection ([Loves%]) may require attention to foster a deeper, more loving bond.",
          "30-65":
            "A marriage with moderate compatibility ([Compatibility%]) and affection ([Loves%]) suggests a balanced relationship that, with mutual effort and understanding, could grow stronger and more fulfilling.",
          "65-90":
            "The blend of moderate compatibility ([Compatibility%]) and high affection ([Loves%]) paints a promising picture for marriage, indicating a relationship with deep emotional bonds and the potential for lasting happiness.",
          ">90":
            "Moderate compatibility ([Compatibility%]) combined with exceptionally high affection ([Loves%]) reveals a marriage potential that's emotionally vibrant and deeply connected, suggesting a powerful, enduring love.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) suggests a well-matched partnership for marriage, though the lower intensity of affection ([Loves%]) points to the need for nurturing more warmth and emotional depth.",
          "30-65":
            "This marriage scenario is built on high compatibility ([Compatibility%]) and solid affection ([Loves%]), indicating a strong and stable relationship with room for growing emotional intimacy.",
          "65-90":
            "With both high compatibility ([Compatibility%]) and strong affection ([Loves%]), your relationship is marked by a deep, loving connection that bodes well for a happy, enduring marriage.",
          ">90":
            "An exceptional marriage is indicated by very high compatibility ([Compatibility%]) and extraordinarily high affection ([Loves%]), pointing to a profound, once-in-a-lifetime love and partnership.",
        },
        ">90": {
          "<30":
            "Extraordinary compatibility ([Compatibility%]) indicates a nearly perfect match for marriage, though cultivating deeper affection ([Loves%]) could turn an excellent partnership into an exceptional one.",
          "30-65":
            "With unparalleled compatibility ([Compatibility%]) and moderate affection ([Loves%]), your relationship has the makings of a strong, healthy marriage, rich in understanding and mutual respect.",
          "65-90":
            "Very high compatibility ([Compatibility%]) combined with intense affection ([Loves%]) signifies a marriage with both a strong foundation and a deeply passionate, loving connection.",
          ">90":
            "An ideal match for marriage, characterized by exceptional compatibility ([Compatibility%]) and extraordinarily high affection ([Loves%]), suggesting a union of deep love, understanding, and mutual fulfillment.",
        },
      },
    },
    Affection: {
      compatibility: {
        "<30": {
          "<30":
            "There's a hint of affection, yet with low compatibility ([Compatibility%]) and minimal emotional intensity ([Loves%]), the connection might remain superficial.",
          "30-65":
            "Despite the challenges posed by low compatibility ([Compatibility%]), a moderate level of affection ([Loves%]) suggests a potential to nurture a warmer, more caring relationship.",
          "65-90":
            "The contrast between your low compatibility ([Compatibility%]) and the high level of affection ([Loves%]) reveals a complex but deeply felt bond, suggesting that emotional warmth could overcome the odds.",
          ">90":
            "Exceptionally high affection ([Loves%]) shines through, despite low compatibility ([Compatibility%]), indicating a profound emotional connection that defies expectations.",
        },
        "30-65": {
          "<30":
            "With moderate compatibility ([Compatibility%]), the relationship has a foundation for affection, though the low intensity of feelings ([Loves%]) suggests it may need more nurturing to deepen.",
          "30-65":
            "Your relationship is marked by a balanced compatibility ([Compatibility%]) and a moderate level of affection ([Loves%]), suggesting a comfortable, warm bond that could grow stronger with care.",
          "65-90":
            "High levels of affection ([Loves%]) paired with moderate compatibility ([Compatibility%]) indicate a relationship that's emotionally rich and nurturing, likely to evolve into a deeper, more intimate connection.",
          ">90":
            "The combination of moderate compatibility ([Compatibility%]) and exceptionally high affection ([Loves%]) speaks to a deeply caring relationship that transcends the ordinary, suggesting a potential for profound emotional fulfillment.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) suggests a strong potential for affection, yet the low intensity of feelings ([Loves%]) may indicate a more practical bond than a deeply emotional one.",
          "30-65":
            "A solid foundation of high compatibility ([Compatibility%]) combined with a moderate level of affection ([Loves%]) creates a nurturing environment for a warm, supportive relationship.",
          "65-90":
            "Your relationship enjoys both high compatibility ([Compatibility%]) and strong affection ([Loves%]), indicating a deeply connected and emotionally fulfilling bond that's both comforting and enduring.",
          ">90":
            "An extraordinary level of affection ([Loves%]), matched with high compatibility ([Compatibility%]), highlights a relationship of profound emotional depth and mutual care, rare and precious.",
        },
        ">90": {
          "<30":
            "Exceptional compatibility ([Compatibility%]) offers a perfect setting for affection, though the current low intensity of feelings ([Loves%]) suggests the emotional depth is yet to be fully explored and developed.",
          "30-65":
            "With unparalleled compatibility ([Compatibility%]) and moderate affection ([Loves%]), your relationship is characterized by a genuine warmth and care, promising a deeply satisfying emotional bond.",
          "65-90":
            "Your relationship is distinguished by very high compatibility ([Compatibility%]) and intense affection ([Loves%]), embodying an ideal of deep emotional connection and nurturing care.",
          ">90":
            "Marked by both exceptional compatibility ([Compatibility%]) and extraordinarily high affection ([Loves%]), your relationship exemplifies a depth of emotional intimacy and mutual care that is both rare and deeply valuable.",
        },
      },
    },
    Love: {
      compatibility: {
        "<30": {
          "<30":
            "A spark of attraction exists, but with both low compatibility ([Compatibility%]) and minimal affection ([Loves%]), the love may struggle to grow stronger.",
          "30-65":
            "Despite low compatibility ([Compatibility%]), a moderate level of affection ([Loves%]) suggests a warmth and potential for growth in your love.",
          "65-90":
            "Even with compatibility at [Compatibility%], the high intensity of your feelings ([Loves%]) indicates a passionate, albeit challenging, love.",
          ">90":
            "Remarkably, the intense affection ([Loves%]) transcends the low compatibility ([Compatibility%]), suggesting a love that's deeply felt and potentially transformative.",
        },
        "30-65": {
          "<30":
            "Your love shares moderate compatibility ([Compatibility%]), but the low intensity of affection ([Loves%]) may hint at challenges in deepening the connection.",
          "30-65":
            "With a foundation of moderate compatibility ([Compatibility%]) and affection ([Loves%]), your relationship has the potential to grow in love and understanding.",
          "65-90":
            "A harmonious blend of compatibility ([Compatibility%]) and high affection ([Loves%]) enriches your love, making it vibrant and deeply connected.",
          ">90":
            "Your love benefits from both moderate compatibility ([Compatibility%]) and exceptionally high affection ([Loves%]), indicating a powerful and profound connection.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) lays a strong foundation for your love, but the lower intensity of affection ([Loves%]) may suggest a need for deeper emotional connection.",
          "30-65":
            "Your love is strong, supported by high compatibility ([Compatibility%]) and a solid level of affection ([Loves%]), promising a balanced and fulfilling relationship.",
          "65-90":
            "This love is deeply rooted in both high compatibility ([Compatibility%]) and strong feelings ([Loves%]), embodying a passionate and enduring partnership.",
          ">90":
            "An exceptional love story, marked by high compatibility ([Compatibility%]) and intensely deep affection ([Loves%]), suggesting a once-in-a-lifetime connection.",
        },
        ">90": {
          "<30":
            "Your compatibility ([Compatibility%]) is extraordinarily high, suggesting a perfect match, though the lower intensity of affection ([Loves%]) calls for fostering deeper emotional ties.",
          "30-65":
            "With unparalleled compatibility ([Compatibility%]), and moderate affection ([Loves%]), your love has the makings of a lasting, deeply connected relationship.",
          "65-90":
            "This love transcends the ordinary, with very high compatibility ([Compatibility%]) and strong, passionate affection ([Loves%]), heralding a profound and enduring bond.",
          ">90":
            "A match made in heaven, your love is defined by both exceptional compatibility ([Compatibility%]) and intensely deep mutual affection ([Loves%]), offering a depth of connection that's both rare and precious.",
        },
      },
    },
    Friends: {
      compatibility: {
        "<30": {
          "<30":
            "While there's a friendly vibe, the low compatibility of [Compatibility%] combined with minimal intensity in feelings ([Loves%]) suggests a very casual, perhaps superficial connection.",
          "30-65":
            "Despite the low compatibility of [Compatibility%], a moderate level of affection ([Loves%]) brings warmth to your friendship, hinting at potential for growth.",
          "65-90":
            "Even with compatibility at [Compatibility%], the high intensity of feelings ([Loves%]) suggests a deeper emotional bond, contrasting the otherwise casual friendship.",
          ">90":
            "Remarkably, despite low compatibility ([Compatibility%]), the extraordinary intensity of your mutual affection ([Loves%]) elevates this friendship, suggesting a profound connection rare at this level of compatibility.",
        },
        "30-65": {
          "<30":
            "You share a moderate compatibility of [Compatibility%] in your friendship, but the low intensity of feelings ([Loves%]) might limit the depth of your connection.",
          "30-65":
            "With a compatibility of [Compatibility%] and mutual feelings at [Loves%], your friendship enjoys a balanced, supportive dynamic, ripe for memorable experiences.",
          "65-90":
            "A compatibility of [Compatibility%] paired with strong feelings ([Loves%]) deepens this friendship beyond the ordinary, hinting at an emotionally rich bond.",
          ">90":
            "This friendship stands out with a moderate compatibility of [Compatibility%] and exceptionally high affection ([Loves%]), showcasing a deep, almost soulmate-level connection.",
        },
        "65-90": {
          "<30":
            "High compatibility ([Compatibility%]) forms the backbone of this friendship, but the lower intensity of feelings ([Loves%]) suggests a more intellectual or situational bond than an emotional one.",
          "30-65":
            "Your friendship benefits from high compatibility ([Compatibility%]) and a solid foundation of affection ([Loves%]), making it strong and dependable.",
          "65-90":
            "With both high compatibility ([Compatibility%]) and strong feelings ([Loves%]), your friendship is deeply rooted and emotionally fulfilling, likely to endure life's ups and downs.",
          ">90":
            "An exceptional friendship characterized by high compatibility ([Compatibility%]) and very intense mutual affection ([Loves%]), indicative of a rare and precious bond that transcends typical friendships.",
        },
        ">90": {
          "<30":
            "An extraordinary level of compatibility ([Compatibility%]) defines this friendship, though the low intensity of feelings ([Loves%]) may suggest a bond that's more intellectual than emotional.",
          "30-65":
            "Your friendship is uniquely profound due to very high compatibility ([Compatibility%]). Moderate levels of affection ([Loves%]) add warmth and depth, enriching your connection.",
          "65-90":
            "This friendship is truly exceptional, with both very high compatibility ([Compatibility%]) and strong emotional ties ([Loves%]), embodying a deep and meaningful connection.",
          ">90":
            "A once-in-a-lifetime friendship, marked by unparalleled compatibility ([Compatibility%]) and intense mutual affection ([Loves%]), offering a depth of connection that's both rare and precious.",
        },
      },
    },
  };
  const compatibilityKey =
    compatibility < 30
      ? "<30"
      : compatibility < 65
      ? "30-65"
      : compatibility < 90
      ? "65-90"
      : ">90";
  const loveKey =
    love < 30 ? "<30" : love < 65 ? "30-65" : love < 90 ? "65-90" : ">90";

  const messageTemplate = `${showCat} ➜ ${messages[category]?.compatibility[compatibilityKey]?.[loveKey]}`;
  if (!messageTemplate)
    return "No message available for these inputs. Please try again";

  return messageTemplate
    .replace("[Compatibility%]", `${compatibility}%`)
    .replace("[Loves%]", `${love}%`);
};
