/**
 * Created by Dorian on 09.03.15.
 */
var postsData = [
    {
        title: 'Chorobowe',
        author: 'Sacha Greif',
        url: ''
    },
    {
        title: 'Ból w klatce piersiowej',
        author: 'Tom Coleman',
        url: ''
    },
    {
        title: 'Przeziębienie',
        author: 'Tom Coleman',
        url: ''
    }
];
Template.postsList.helpers({
    posts: postsData
});