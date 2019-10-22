import Vue from "vue";

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      exchangeRates: [],
      searchAmountInEuros: null,
      resultConvertEurosToOther: null,
      searchAmountInOther: null,
      resultConvertOtherToEuros: null,
      selectedCurrency: null,
      selectedFirstCurrency: null,
      selectedSecondCurrency: null,
      searchAmountOtherToOther: null,
      resultConvertOtherToOther: null
    },
    computed: {
      selectedRate: function(){
        return this.exchangeRates[this.selectedCurrency]
      },
      selectedFirstRate: function(){
        return this.exchangeRates[this.selectedFirstCurrency]
      },
      selectedSecondRate: function(){
        return this.exchangeRates[this.selectedSecondCurrency]
      }
    },
    mounted(){
      this.fetchExchangeRates();
    },
    methods: {
      fetchExchangeRates: function(){
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(data => this.exchangeRates = data.rates)
      },
      convertEurosToOther: function(){
        this.resultConvertEurosToOther = (this.searchAmountInEuros * this.selectedRate).toFixed(2);
      },
      convertOtherToEuros: function(){
        this.resultConvertOtherToEuros = (this.searchAmountInOther / this.selectedRate).toFixed(2);
      },
      convertOtherToOthers: function(){
        const convertToEuros =
         (this.searchAmountOtherToOther / this.selectedFirstRate);
         console.log(convertToEuros)
         this.resultConvertOtherToOther = (convertToEuros * this.selectedSecondRate).toFixed(2);
         return this.resultConvertOtherToOther;
      }
    }
  })
})
