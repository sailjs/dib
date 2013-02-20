define(['dib'],
function(Dib) {

  describe("dib", function() {
    
    it('should export constructor', function() {
      expect(Dib).to.exist;
      expect(Dib).to.be.a('function');
    });
    
  });
  
  return { name: "test.dib" }
});
