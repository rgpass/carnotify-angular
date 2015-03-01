require 'rubygems'
require 'bundler'
Bundler.require

require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  # Logical paths to your assets
  set :assets_prefix, %w(assets vendor/assets bower_components angular)

  register Sinatra::AssetPipeline

  get '/' do
    slim :main
  end
end

run App