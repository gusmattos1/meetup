class Event < ApplicationRecord
    validates :event_id, presence: true, uniqueness: true
end
