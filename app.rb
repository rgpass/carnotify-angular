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
    slim :main
  end

  get '/app/' do
    slim :main
  end

  # response.set_cookie "remember", {:value => 'abcd1234', :expires => (Time.now + 52*7*24*60*60)}

  get '/api/v1/*' do
    end_point = params[:splat].first
    query_params = URI.encode_www_form(params)
    HTTParty.get("https://carnotify-api.herokuapp.com/api/v1/#{end_point}?#{query_params}").to_json
  end

  get '/partials/*' do
    slim :"angular_partials/#{params[:splat].first}", layout: false
  end

  not_found do
    status 404
    slim :oops
  end
end
