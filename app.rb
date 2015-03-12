require 'rubygems'
require 'bundler'
require 'pry'
Bundler.require

require 'sinatra/asset_pipeline'
require 'sinatra/cookies'

class App < Sinatra::Base
  # Logical paths to your assets
  set :assets_prefix, %w(assets vendor/assets)

  register Sinatra::AssetPipeline
  helpers Sinatra::Cookies

  get '/' do
    slim :signup
  end

  post '/signup' do
    api_response = HTTParty.post('https://carnotify-api.herokuapp.com/api/v1/users', query: params)
    remember_token = api_response.headers['set-cookie'].split(';')[1].split('remember_token=').last
    expiration = Time.parse(api_response.headers['set-cookie'].split(';').last.split('=').last)
    response.set_cookie "remember_token", {:value => remember_token, :expires => (expiration)}
    redirect '/app/#/select'
  end

  get '/signin' do
    slim :signin
  end

  post '/signin' do
    api_response = HTTParty.post('https://carnotify-api.herokuapp.com/api/v1/sessions', query: params)
    remember_token = api_response.headers['set-cookie'].split(';')[1].split('remember_token=').last
    expiration = Time.parse(api_response.headers['set-cookie'].split(';').last.split('=').last)
    response.set_cookie "remember_token", {:value => remember_token, :expires => (expiration)}
    redirect '/app/#/select'
  end

  get '/app/' do
    # If no cookie, redirect to /signin
    slim :main
  end

  # response.set_cookie "remember", {:value => 'abcd1234', :expires => (Time.now + 52*7*24*60*60)}

  get '/api/v1/*' do
    end_point = params[:splat].first
    query_params = URI.encode_www_form(params)
    HTTParty.get("https://carnotify-api.herokuapp.com/api/v1/#{end_point}?#{query_params}").to_json
  end

  get '/app/partials/*' do
    slim :"angular_partials/#{params[:splat].first}", layout: false
  end

  not_found do
    status 404
    slim :oops
  end
end
