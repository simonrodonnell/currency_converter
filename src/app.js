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
      selectedCurrency: null
    },
    mounted(){
      this.fetchExchangeRates();
    },
    methods: {
      fetchExchangeRates: function(){
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(data => this.exchangeRates = data.rates)
        console.log(this.exchangeRates)
      },
      convertEurosToOther: function(){
        this.resultConvertEurosToOther = this.searchAmountInEuros * this.selectedCurrency;
        console.log("search amount:", this.searchAmountInEuros)
        console.log("currency:", this.selectedCurrency)
        console.log("result:", this.resultConvertEurosToOther)
        this.searchAmountInEuros = null;
        this.selectedCurrency = null;
      },
      convertOtherToEuros: function(){
        this.resultConvertOtherToEuros = this.searchAmountInOther / this.selectedCurrency;
        this.searchAmountInOther = null;
        this.selectedCurrency = null;
      }
    }
  })
})
