class MainController < ApplicationController

    def index

      @last_events = Event.all.order(updated_at: :asc) 
      p @last_events
  end
end
