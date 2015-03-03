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
    HTTParty.get("https://carnotify-api.herokuapp.com/api/v1/#{params[:splat].first}").to_json
  end

  get '/partials/*' do
    erb :"angular_partials/#{params[:splat].first}"
  end

  not_found do
    status 404
    slim :oops
  end
end
