Parks = new Mongo.Collection("parks");

if (Meteor.isClient) {

  Template.body.helpers({
    park: function() {
      var selectedPark = Session.get('selectedPark');
      return Parks.find()
    },
    nearBy: function(limit) {
      var limit = limit || 5;
      var selectedParkPos = Session.get('selectedParkPos');
      var nearByParks = Parks.find({"pos": {$near:selectedParkPos}}, {sort: {count:-1}, limit: 5});
      return nearByParks;
    },
    'selectedClass': function() {
      var selectedId = "a" + this._id.valueOf();
      var selectedPark = Session.get('selectedPark');
      if(selectedId == "a" + selectedPark) {
        return "selected"
      }
    },
  });

  Template.body.events({
    'submit form': function() {
      event.preventDefault();
      var parkName = event.target.parkName.value;
      var lon = parseFloat(event.target.lon.value);
      var lat = parseFloat(event.target.lat.value);
      Parks.insert({
        "Name": parkName,
        "pos" : [lon, lat]
      });
      var form = document.getElementById("form");
      form.reset();
    },
    'click .remove': function() {
      var selectedPark = Session.get('selectedPark');
      Parks.remove(selectedPark);
    },
    'click .park': function() {
      var parkId = this._id.valueOf();
      var pos = this.pos;
      Session.set('selectedPark', parkId);
      Session.set('selectedParkPos', pos);
    }
  });

}
