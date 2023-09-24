Operation of the default values system:

To always have an administrator user, you can enable it in the ENV to generate one. If it exists, it will read the .secret file in the root and use the value as the password in the database. This way, even with an empty database, you will have a way to log in and make edits.

Another point is the default values for the TAG and SOCIAL tables, which by default add some values that can be edited in the CSV files in "util/default/".

These default values, other than the admin, are only inserted once if there are no values in the database.

The admin password is always updated when the server is restarted in the .secret file and updated in the database.