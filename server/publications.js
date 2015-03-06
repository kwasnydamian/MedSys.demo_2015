/**
 * Created by damian on 04.03.15.
 */
Meteor.publish('calendar', function () {
    return Calendar.find();
});