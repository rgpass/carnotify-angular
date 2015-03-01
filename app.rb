require 'sinatra'
require 'slim'

get '/' do
  slim :main
end