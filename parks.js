Parks = new Mongo.Collection("parks");

if (Meteor.isClient) {

  Template.body.helpers({
    park: function () {
      return Parks.find()
    },
    'selectedClass': function() {
      var selectedId = "a" + this._id.valueOf();
      var selectedPark = Session.get('selectedPark');
      if(selectedId == selectedPark) {
        return "selected"
      }
    }
  });

  Template.body.events({
    'click .park': function() {
      var parkId = "a" + this._id.valueOf();
      Session.set('selectedPark', parkId);
      console.log(parkId);
      // var selectedPark = Session.get('selectedPark');
    }
  });
}
