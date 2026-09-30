/* CandyMath engine - sugar stages, altitude correction, syrup math. Pure functions, no DOM. */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CandyMath = api;
}(typeof self !== 'undefined' ? self : this, function () {

  function r1(x) { return Math.round(x * 10) / 10; }
  function r2(x) { return Math.round(x * 100) / 100; }

  // Sugar stages at sea level, C. Ranges from standard confectionery tables.
  var STAGES = [
    { id: 'thread', name: 'Thread', loC: 110, hiC: 112.8, use: 'Syrups, preserves' },
    { id: 'soft-ball', name: 'Soft ball', loC: 112.8, hiC: 115.6, use: 'Fudge, fondant' },
    { id: 'firm-ball', name: 'Firm ball', loC: 118.3, hiC: 121.1, use: 'Caramels' },
    { id: 'hard-ball', name: 'Hard ball', loC: 121.1, hiC: 129.4, use: 'Nougat, marshmallow' },
    { id: 'soft-crack', name: 'Soft crack', loC: 132.2, hiC: 143.3, use: 'Butterscotch, taffy' },
    { id: 'hard-crack', name: 'Hard crack', loC: 148.9, hiC: 154.4, use: 'Brittle, lollipops, toffee' }
  ];

  function stages() { return STAGES.slice(); }

  // Water boils lower with altitude: about -1 C per 285 m (-1 F per 500 ft).
  // Every thermometer target shifts by the same amount. Most recipes never say this.
  function boilPointC(elevM) {
    if (elevM < -430 || elevM > 6000) return null;
    return r2(100 - elevM / 274.32);
  }
  function altitudeOffsetC(elevM) {
    var bp = boilPointC(elevM);
    if (bp === null) return null;
    return r2(100 - bp);
  }
  function adjustTempC(targetC, elevM) {
    var off = altitudeOffsetC(elevM);
    if (off === null) return null;
    return r1(targetC - off);
  }
  function stageAt(tempC, elevM) {
    if (altitudeOffsetC(elevM) === null) return null;
    for (var i = STAGES.length - 1; i >= 0; i--) {
      var lo = adjustTempC(STAGES[i].loC, elevM);
      if (tempC >= lo) return STAGES[i];
    }
    return null; // below thread stage - just syrup warming up
  }

  return { stages: stages, boilPointC: boilPointC, altitudeOffsetC: altitudeOffsetC,
    adjustTempC: adjustTempC, stageAt: stageAt };
}));
