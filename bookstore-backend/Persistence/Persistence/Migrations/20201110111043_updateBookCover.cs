using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class updateBookCover : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "BookCovers");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "BookCovers",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "BookCovers",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldMaxLength: 10);

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "BookCovers",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }
    }
}
