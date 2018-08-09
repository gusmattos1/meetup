class MainController < ApplicationController

    def index

      @last_events = Event.all.order(updated_at: :desc) 
      
  end
end
