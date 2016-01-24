Parks = new Mongo.Collection("parks");

if (Meteor.isClient) {

  Template.body.helpers({
    parks: function () {
      return Parks.find().fetch();
    }
  });

}
