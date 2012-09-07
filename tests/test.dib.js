define(['dib/dib',
        'chai'],
function(Dib, chai) {
  var expect = chai.expect;

  describe("dib", function() {
    
    it('should export constructor', function() {
      expect(Dib).to.exist;
      expect(Dib).to.be.a('function');
    });
    
  });
  
  return { name: "test.dib" }
});
