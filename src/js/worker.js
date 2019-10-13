// Generated by CoffeeScript 2.0.3
(function() {
  var convertors,
    freq,
    freqToText,
    hashid,
    init,
    isAlNum,
    isAlpha,
    isDigit,
    isLower,
    sendResult,
    sortFreq,
    stripPunctuation,
    worker;

  worker = self;

  hashid = [
    {
      n: "MySQL",
      s: "63cea4673fd25f46",
      c: function(hash, hs) {
        return (
          hash.length === hs.length &&
          !isDigit(hash) &&
          !isAlpha(hash) &&
          isAlNum(hash)
        );
      }
    },
    {
      n: "MD5",
      s: "ae11fd697ec92c7c98de3fac23aba525",
      c: function(hash, hs) {
        return (
          hash.length === hs.length &&
          !isFigit(hash) &&
          !isAlpha(hash) &&
          isAlNum(hash)
        );
      }
    },
    {
      n: "ADLER-32",
      s: "4607",
      c: function(hash, hs) {
        return hash.length === hs.length && !isAlpha(hash) && isAlNum(hash);
      }
    },
    {
      n: "CRC-32",
      s: "3d08",
      c: function(hash, hs) {
        return (
          hash.length === hs.length &&
          !isDigit(hash) &&
          !isAlpha(hash) &&
          isAlNum(hash)
        );
      }
    },
    {
      m: "CRC-32B",
      s: "0e5b",
      c: function(hash, hs) {
        return (
          hash.length === hs.length &&
          !isDigit(hash) &&
          !isAlpha(hash) &&
          isAlNum(hash)
        );
      }
    },
    {
      m: "CRC-16-CCITT",
      s: "b33fd057",
      c: function(hash, hs) {
        return (
          hash.length === hs.length &&
          !isDigit(hash) &&
          isAlpha(hash) &&
          isAlNum(hash)
        );
      }
    }
  ];

  convertors = {
    uppercase: function(text) {
      return text.toUpperCase();
    },
    lowercase: function(text) {
      return text.toLowerCase();
    },
    titlecase: function(text) {
      var result;
      result = [];
      text
        .toLowerCase()
        .split(" ")
        .forEach(function(word) {
          return result.push(word.charAt(0).toUpperCase() + word.slice(1));
        });
      return result.join(" ");
    },
    countchars: function(text) {
      return text.length + " characters";
    },
    countwords: function(text) {
      return text.split(/\s+/).length + " words";
    },
    countlines: function(text) {
      return text.split("\n").length + " lines";
    },
    rot13: function(text) {
      return text.replace(/[A-z]/g, function(chars) {
        return String.fromCharCode(
          chars.charCodeAt(0) + (chars.toUpperCase() <= "M" ? 13 : -13)
        );
      });
    },
    sortlinesalpha: function(text) {
      return text
        .split("\n")
        .sort()
        .join("\n");
    },
    sortlinesalphaci: function(text) {
      return text
        .split("\n")
        .sort(function(a, b) {
          if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        })
        .join("\n");
    },
    wordfreq: function(text) {
      return freqToText(
        sortFreq(freq(stripPunctuation(text.toLowerCase().split(/\s+/))))
      );
    },
    charfreq: function(text) {
      return freqToText(sortFreq(freq(text.split(""))));
    },
    columnextract: function(text, column) {
      var c, fields, k, len, row, rows;
      c = parseInt(column, 10);
      if (!c) {
        return "Error: Please type column number";
      }
      c--;
      column = [];
      rows = text.split("\n");
      for (k = 0, len = rows.length; k < len; k++) {
        row = rows[k];
        fields = row.split("\t");
        if (fields[c] != null) {
          column.push(fields[c]);
        }
      }
      return column.join("\n");
    },
    replace: function(text, find, replace) {
      var re;
      re = new RegExp(find, "g");
      return text.replace(re, replace);
    },
    replace_new_line: function(text, find) {
      var re;
      re = new RegExp(find, "g");
      return text.replace(re, "\n");
    },
    jsonformat: function(text) {
      var e, o;
      try {
        o = JSON.parse(text);
        return JSON.stringify(o, null, 4);
      } catch (error) {
        e = error;
        return "Error: " + e;
      }
    },
    urlencode: function(text) {
      return encodeURIComponent(text);
    },
    urldecode: function(text) {
      return decodeURIComponent(text);
    },
    base64encode: function(text) {
      if (typeof btoa !== "function") {
        return "Error: Your browser does not support this operation";
      } else {
        return btoa(text);
      }
    },
    base64decode: function(text) {
      var e;
      if (typeof atob !== "function") {
        return "Error: Your browser does not support this operation";
      } else {
        try {
          return atob(text);
        } catch (error) {
          e = error;
          return "Error: " + e;
        }
      }
    },
    addlinenumbers: function(text) {
      var index, k, len, line, lines, num;
      lines = text.split("\n");
      num = 1;
      for (index = k = 0, len = lines.length; k < len; index = ++k) {
        line = lines[index];
        lines[index] = num + " " + line;
        num++;
      }
      return lines.join("\n");
    },
    splittext: function(text, separator) {
      return text.split(separator).join("\n");
    },
    trimlines: function(text) {
      return text
        .split("\n")
        .map(function(el) {
          return el.trim();
        })
        .join("\n");
    },
    reverse: function(text) {
      return text
        .split("")
        .reverse()
        .join("");
    },
    generate_numbers: function(text, from, to) {
      var fn, num, tn;
      fn = parseInt(from, 10);
      tn = parseInt(to, 10);
      return (function() {
        var k, ref, ref1, results;
        results = [];
        for (
          num = k = ref = fn, ref1 = tn;
          ref <= ref1 ? k <= ref1 : k >= ref1;
          num = ref <= ref1 ? ++k : --k
        ) {
          results.push(num);
        }
        return results;
      })().join("\n");
    },
    unix_to_datetime: function(text) {
      return new Date(parseInt(text, 10) * 1000).toString();
    },
    check_hash: function(hash) {
      var k, len, result, tcase;
      result = [];
      for (k = 0, len = hashid.length; k < len; k++) {
        tcase = hashid[k];
        if (tcase.c(hash, tcase.s)) {
          result.push(tcase.n);
        }
      }
      return result.join("\n");
    },
    prefix_suffix: function(text, prefix, siffix) {
      return text
        .split("\n")
        .map(function(line) {
          return prefix + line + siffix;
        })
        .join("\n");
    },
    format_numbers: function(text) {
      var nf;
      nf = Intl.NumberFormat();
      return text.replace(new RegExp("([0-9]+)", "g"), function(metch, num) {
        return nf.format(num);
      });
    },
    underscore: function(text) {
      return text
        .split("")
        .map(function(ch) {
          return ch + "\u0332";
        })
        .join("");
    },
    strikeout: function(text) {
      return text
        .split("")
        .map(function(ch) {
          return ch + "\u0336";
        })
        .join("");
    },
    shuffle: function(text) {
      var a, i, j, x;
      a = text.split("\n");
      i = a.length - 1;
      while (i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
        i--;
      }
      return a.join("\n");
    },
    remove_duplicate: function(text) {
      return Array.from(new Set(text.split("\n"))).join("\n");
    }
  };

  stripPunctuation = function(array) {
    var el, k, len, nel, out;
    out = [];
    for (k = 0, len = array.length; k < len; k++) {
      el = array[k];
      nel = el.replace(
        /^[\s\xA0\.,-\/#!$%\^&\*;:{}=\-"'_`~()\+]+|[\s\xA0\.,-\/#!$%\^&\*;:{}=\-"'_`~()\+]+$/g,
        ""
      );
      if (nel) {
        out.push(nel);
      }
    }
    return out;
  };

  freq = function(array) {
    var coll, el, k, len;
    coll = {};
    for (k = 0, len = array.length; k < len; k++) {
      el = array[k];
      if (!coll[el]) {
        coll[el] = 0;
      }
      coll[el]++;
    }
    return coll;
  };

  sortFreq = function(freq) {
    var arr, count, el;
    arr = [];
    for (el in freq) {
      count = freq[el];
      arr.push([el, count]);
    }
    arr.sort(function(a, b) {
      return b[1] - a[1];
    });
    return arr;
  };

  freqToText = function(freqArr) {
    var k, len, row, text;
    text = [];
    for (k = 0, len = freqArr.length; k < len; k++) {
      row = freqArr[k];
      text.push(row[0] + " => " + row[1]);
    }
    return text.join("\n");
  };

  isLower = function(hash) {
    return hash === hash.toLowerCase();
  };

  isDigit = function(hash) {
    return String(hash) === String(parseInt(hash, 10));
  };

  isAlpha = function(hash) {
    return -1 === hash.search(/[^A-Za-z]/);
  };

  isAlNum = function(hash) {
    return -1 === hash.search(/[^A-Za-z0-9]/);
  };

  sendResult = function(text) {
    return worker.postMessage({
      t: text
    });
  };

  init = function() {
    return worker.addEventListener(
      "message",
      function(m) {
        var convertor;
        convertor = convertors[m.data.cmd];
        if (convertor !== void 0) {
          return sendResult(convertor(...m.data.args));
        } else {
          return sendResult("Error: Not implemented");
        }
      },
      false
    );
  };

  init();
}.call(this));
