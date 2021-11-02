use chrono::{NaiveDateTime, Utc};

pub fn get_naive_date() -> NaiveDateTime {
  let dt = Utc::now();
  let timestamp_seconds = dt.timestamp();
  let timestamp_nano = dt.timestamp_subsec_nanos();

  NaiveDateTime::from_timestamp(timestamp_seconds, timestamp_nano)
}
