-- Create event table
CREATE TABLE events (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       start_datetime TIMESTAMP NOT NULL,
                       end_datetime TIMESTAMP NOT NULL,
                       location VARCHAR(255)
);

-- Insert base data
INSERT INTO events (title, description, start_datetime, end_datetime, location) VALUES
                                                                                   ('Team Meeting', 'Monthly team sync-up', '2025-11-05 10:00:00', '2025-11-05 11:00:00', 'Conference Room A'),
                                                                                   ('Project Kickoff', 'Kickoff for new project', '2025-11-10 09:00:00', '2025-11-10 10:30:00', 'Zoom'),
                                                                                   ('Workshop', 'Frontend development workshop', '2025-11-15 14:00:00', '2025-11-15 16:00:00', 'Room 101'),
                                                                                   ('Holiday Party', NULL, '2025-12-20 18:00:00', '2025-12-20 22:00:00', 'Main Hall');
