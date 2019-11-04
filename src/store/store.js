import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { 
  BUCKET_ADD_LOCATION, 
  BUCKET_REMOVE_LOCATION, 
  CHANGE_CURRENT_SEARCH 
} from './mutation-types';

export default new Vuex.Store({
  state: {
    currentSearch: "", 
    bucket: [
      {
        rating: 5, safety: 5, costAccoms: 88.88, dailyCost: 48.88, timeSpent: 1,
        name: 'Merlion', 
        imgUrls: [
          'https://www.littledayout.com/wp-content/uploads/10-merlion-park.jpg'
        ],
        reviews: [
          {
            "author_name": "ChunKiat Ong",
            "author_url": "https://www.google.com/maps/contrib/107867612598539418830/reviews",
            "language": "en",
            "profile_photo_url": "https://lh4.ggpht.com/-i1t_u2bipG4/AAAAAAAAAAI/AAAAAAAAAAA/T3uKSMWTRwM/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating": 5,
            "relative_time_description": "a month ago",
            "text": "Love the food and coffee! Lookout for the pull beef burger (Chef’s special)! Coupled with the home-made bread, its one of the better burgers i have had. Like the breakfast platter where i am able to mix and match. Particularly impress that they are willing to ‘customise’ my breakfast platter to have e scrambled eggs well done and unsalted. (For my 20mths old son, and together with the sourdough bread, makes a good breakfast for him!) Only goes to show that everything is prepared after order. Lastly, the cheesecake is a must try!",
            "time": 1570107041
          },
          {
            "author_name": "Lyn Chong",
            "author_url": "https://www.google.com/maps/contrib/109544318011085924786/reviews",
            "language": "en",
            "profile_photo_url": "https://lh4.ggpht.com/-T4pwkqc_1L4/AAAAAAAAAAI/AAAAAAAAAAA/5jsVsWjTAd4/s128-c0x00000000-cc-rp-mo/photo.jpg",
            "rating": 5,
            "relative_time_description": "a week ago",
            "text": "The Rose Tea Cake is brilliantly light and fragrant! Delicious.",
            "time": 1572072705
          }
        ],
        ytUrls: [
          { title: '', url: 'https://www.youtube.com/watch?v=xUhjFfFMo10' }
        ],
        news: [
          {
            "title": "Carbon emissions, PMDs, CPF and the Sentosa Merlion among issues to be discussed in Parliament",
            "content": "SINGAPORE: Carbon emissions, the use of Personal Mobility Devices (PMDs) and issues to do with the Central Provident Fund (CPF) scheme will be discussed when Members of Parliament (MPs) meet in Parliament on Monday (Nov 4). Three Bills will also be introduced…",
            "url": "https://www.channelnewsasia.com/news/singapore/parliament-mps-pmds-carbon-emissions-cpf-merlion-12055116",
            "urlToImage": "https://cna-sg-res.cloudinary.com/image/upload/q_auto,f_auto/image/10794074/16x9/991/557/241be6781337407871f8034cd9ce35fc/eu/parliament-house-singapore--top-down-view.jpg"
          }
        ]
      },
    ]
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name

    [CHANGE_CURRENT_SEARCH]: (state, { newSearchString }) => {
      state.currentSearch = newSearchString;
    },

    [BUCKET_ADD_LOCATION]: (state, { location }) => {
      if (state.bucket.find(x => x.name == location.name)) {
        return;
      }
      state.bucket.push(location);
    },
    [BUCKET_REMOVE_LOCATION]: (state, { locationName }) => {
      state.bucket = state.bucket.filter(location => location.name !== locationName);
    },
  }
});