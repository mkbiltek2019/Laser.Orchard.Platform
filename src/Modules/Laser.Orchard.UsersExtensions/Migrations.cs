﻿using System;
using System.Data;
using Orchard.ContentManagement.MetaData;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;
using Orchard.ContentTypes.Events;

namespace Laser.Orchard.UsersExtensions {
    public class Migrations : DataMigrationImpl {

        private readonly IContentDefinitionEventHandler _contentDefinitionEventHandlers;

        public Migrations(
            IContentDefinitionEventHandler contentDefinitionEventHandlers) {

            _contentDefinitionEventHandlers = contentDefinitionEventHandlers;
        }

        public int Create() {
            ContentDefinitionManager.AlterTypeDefinition("User", content => content
                .WithPart("UserRegistrationPolicyPart"));

            return 1;
        }

        /// <summary>
        /// This migration added when we implemented the front end settings for display/
        /// edit controlled by ProfilePart, that need things you want to show on front end to 
        /// be in the actual definitions of ContentTypes.
        /// </summary>
        public int UpdateFrom1() {
            ContentDefinitionManager.AlterPartDefinition("FavoriteCulturePart", builder => builder
                .Attachable(false));
            ContentDefinitionManager.AlterTypeDefinition("User", content => content
                .WithPart("FavoriteCulturePart"));
            _contentDefinitionEventHandlers.ContentPartAttached(
                new ContentPartAttachedContext { ContentTypeName = "User", ContentPartName = "FavoriteCulturePart" });

            return 2;
        }

        public int UpdateFrom2() {
            SchemaBuilder.CreateTable("ManifestAppFileRecord",
                table => table
                    .Column<int>("Id", col => col.PrimaryKey().Identity())
                    .Column<string>("FileContent", col => col.Nullable().Unlimited())
                );
            return 3;
        }

    }
}
