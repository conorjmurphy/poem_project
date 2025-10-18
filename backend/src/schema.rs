// @generated automatically by Diesel CLI.

diesel::table! {
    poems (id) {
        id -> Nullable<Integer>,
        title -> Text,
        author -> Text,
        content -> Text,
    }
}
