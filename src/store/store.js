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
          { title: 'best place', description: '...', rating: 5 },
          { title: 'bestest place', description: '...', rating: 5 },
          { title: 'bester place', description: '...', rating: 5 },
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