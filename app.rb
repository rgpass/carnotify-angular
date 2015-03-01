# require 'sinatra'
# require 'slim'

# get '/' do
#   slim :main
# end

Bundler.require

require 'sinatra'
require 'slim'
require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  register Sinatra::AssetPipeline

  get '/' do
    slim :main
  end
end