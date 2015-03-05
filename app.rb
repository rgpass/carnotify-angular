require 'rubygems'
require 'bundler'
Bundler.require

require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  # Logical paths to your assets
  set :assets_prefix, %w(assets vendor/assets)

  register Sinatra::AssetPipeline

  get '/' do
    slim :main
  end

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
