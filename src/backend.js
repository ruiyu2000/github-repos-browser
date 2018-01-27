import Vue from "vue";
import axios from "axios";


export const BACKEND = axios.create({
  baseURL: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100',
  timeout: 25000
});