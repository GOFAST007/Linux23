describe('rerun axe in the same tick' + window.location.pathname, function () {
  'use strict';

  before(function (done) {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('can run multiple times without interfering with itself', function (done) {
    var options = {
      runOnly: {
        type: 'rule',
        values: ['html-has-lang']
      }
    };

    // First run
    axe.run(options, function (err1, res1) {
      assert.isNull(err1);

      // Second run, on the same tick
      axe.run(options, function (err2, res2) {
        assert.isNull(err2);

        delete res1.timestamp;
        delete res2.timestamp;
        assert.deepEqual(res1, res2);
        done();
      });
    });
  });
});
