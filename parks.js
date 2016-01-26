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
    'click .park': function() {
      var parkId = this._id.valueOf();
      var pos = this.pos;
      Session.set('selectedPark', parkId);
      Session.set('selectedParkPos', pos);
    },
    // 'submit form': function() {
    //   console.log("Form was submitted...like a BOSS");
    // }
  });
}

// if (Meteor.isServer) {
//   Meteor.methods({
//     'sendLogMessage': function() {
//       console.log('you just clicked a button that did server stuff!!!');
//     }
//   });
